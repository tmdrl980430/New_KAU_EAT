import React from "react";
import { atom } from "recoil";

export const jwtRecoilState = atom({key: 'jwtRecoilState', default: ''});

export const isLoginRecoilState = atom({key: 'isLoginRecoilState', default: false});