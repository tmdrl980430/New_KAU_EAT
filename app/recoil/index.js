import React from "react";
import {atom} from "recoil";


export const severURLRecoilState = atom({key: 'severURLRecoilState', default: 'http://3.38.35.114/web'});

export const phoneDuplicateRecoilState = atom({key: 'phoneDuplicateRecoilState', default: false});

export const jwtRecoilState = atom({key: 'jwtRecoilState', default: ''});

export const userIdxRecoilState = atom(
    {key: 'userIdxRecoilState', default: null}
);

export const isLoginRecoilState = atom(
    {key: 'isLoginRecoilState', default: true}
);

export const userIdRecoilState = atom({key: 'userIdRecoilState', default: ''});

export const userNameRecoilState = atom(
    {key: 'userNameRecoilState', default: ''}
);

export const userTicketRecoilState = atom(
    {key: 'userTicketRecoilState', default: 0}
);

const now = new Date();

const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

const today = String(koreaNow.getFullYear()) + '-' + String(
    koreaNow.getMonth() + 1
).padStart(2, '0') + '-' + String(koreaNow.getDate()).padStart(2, '0')

//결제 uid를 위해 사용하는 시간
let hours = koreaNow.getHours(); //시
let minutes = koreaNow.getMinutes(); //분
let seconds = koreaNow.getSeconds(); //초
let milliseconds = koreaNow.getMilliseconds(); //밀리초
const currentTime = hours + ':' + minutes + ':' + seconds + ':' +
        milliseconds

export const currentTimeRecoilState = atom(
    {key: 'currentTimeRecoilState', default: currentTime}
);

export const merchantUidRecoilState = atom(
    {key: 'merchantUidRecoilState', default: ''}
);

export const dateRecoilState = atom({key: 'dateRecoilState', default: today});

export const cefiBtnRecoilState = atom(
    {key: 'cefiBtnRecoilState', default: false}
);

export const purchaseTicketRecoilState = atom({
    key: 'purchaseTicketRecoilState',
    default: [0, 0, 0, 0]
});

export const clickQrImgRecoilState = atom(
    {key: 'clickQrImgRecoilState', default: ""}
);

export const mainRerenderingRecoilState = atom({key: 'mainRerenderingRecoilState', default: false});


export const paymentsRecoilState = atom({key: 'paymentsRecoilState', default: false});

export const modalRecoilState = atom({key: 'modalRecoilState', default: false});

export const logoutmodalRecoilState = atom({key: 'logoutmodalRecoilState', default: false});

export const findIdmodalRecoilState = atom({key: 'findIdmodalRecoilState', default: false});

export const phoneNumberRecoilState = atom({key: 'phoneNumberRecoilState', default: ''});

export const phonecefimodalRecoilState = atom({key: 'phonecefimodalRecoilState', default: false});

export const phoneceficonfirmmodalRecoilState = atom({key: 'phoneceficonfirmmodalRecoilState', default: false});

export const purchasemodalRecoilState = atom({key: 'purchasemodalRecoilState', default: false});

export const SoldOutConfirmModalRecoilState = atom({key: 'SoldOutConfirmModalRecoilState', default: false});

export const SoldOutConfirmRecoilState = atom({key: 'SoldOutConfirmRecoilState', default: false});

export const qrModalRecoilState = atom(
    {key: 'qrModalRecoilState', default: false}
);

export const qrTicketCountRecoilState = atom(
    {key: 'qrTicketCountRecoilState', default: 1}
);
