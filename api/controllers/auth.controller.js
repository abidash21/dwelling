import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const register = async (req,res) => {
    const { username, email, password} = req.body
    try {
        //Hash the password
    
        const hashedPassword = await bcrypt.hash(password, 10)
        //Create new user
        const newUser = await prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword,
            },
          });
        console.log(newUser)
        res.status(201).json({message: "User created successfuly"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create User!"})
    }
}
export const login = async (req,res) => {
    const {username,password} = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {username}
        })
        //Check if the user exist
        if (!user) return res.status(400).json({message: "Invalid Credentials!"})

        //Check if the password is correct
        const isPassword=await bcrypt.compare(password,user.password)

        if (!isPassword) return res.status(400).json({message: "Invalid Credentials!"})  
        
        //Generate a token and send it to user
        const age = 1000 * 60 * 60 * 24 *7

        const token = jwt.sign({
            id: user.id,
            isAdmin: false
        }, process.env.JWT_SECRET_KEY,{ expiresIn: age})

        const {password: UserPassword, ...userInfo} = user
        //res.setHeader("Set-Cookie","test="+"myValue").json("success")
        const options = {
            httpOnly: true,
            // secure: true,  --  remove comments for production environment
            maxAge: age
        }
        res
        .cookie("token",token,options)
        .status(200)
        .json(userInfo)

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Failed to Login"})
    }
}
export const logout = (req,res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
}