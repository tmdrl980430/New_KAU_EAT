import React from "react";
import {atom} from "recoil";

export const jwtRecoilState = atom({key: 'jwtRecoilState', default: ''});

export const userIdxRecoilState = atom(
    {key: 'userIdxRecoilState', default: null}
);

export const isLoginRecoilState = atom(
    {key: 'isLoginRecoilState', default: true}
);

const now = new Date();

const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

const today = String(koreaNow.getFullYear()) + '-' + String(
    koreaNow.getMonth() + 1
).padStart(2, '0') + '-' + String(koreaNow.getDate()).padStart(2, '0')

export const dateRecoilState = atom({key: 'dateRecoilState', default: today});