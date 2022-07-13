import React from "react";
import { atom } from "recoil";

export const jwtRecoilState = atom({key: 'jwtRecoilState', default: ''});

export const userIdxRecoilState = atom({key: 'userIdxRecoilState', default: null});

export const isLoginRecoilState = atom({key: 'isLoginRecoilState', default: true});

export const dateRecoilState = atom({key: 'dateRecoilState', default: ""});