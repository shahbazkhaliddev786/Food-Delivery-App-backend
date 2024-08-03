import { User } from "../models/user.model.js";
import { JWT_SECRET } from "../controllers/auth.controller.js";
import passportJwt from "passport-jwt";
import passport, { PassportStatic } from "passport";
import { Request } from "express";

const {Strategy} = passportJwt;


const cookieExtractor = (req:Request)=>{
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies?.jwt;
    }

    return jwt;
}

const optionsCookie = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET
} 

export default (passport: PassportStatic)=>{
    passport.use(
        new Strategy(optionsCookie, async (payload, done)=>{
            await User.findById(payload.userId).then((user)=>{
                user ? done(null, user) : done(null, false)
            }).catch(()=> done(null, false));
        })
    )
}