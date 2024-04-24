import React from "react";
import {View} from "react-native";

const ActiveIcon = ({ size = 48, color = 'black' }) => {
    return (
        <View
            style={[
                {alignItems: 'center', justifyContent: 'center', width: size, height: size },
            ]}>
            <svg width="100%" height="100%"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.19633 17.7659L6.08633 18.3989C5.92633 18.4909 5.72733 18.3759 5.72633 18.1919L5.71033 15.9249C5.70933 15.8169 5.63733 15.7219 5.53333 15.6939L2.95533 14.9859C2.77333 14.9359 2.71733 14.7039 2.85633 14.5759L5.21933 12.4079C5.34633 12.2899 5.31233 12.0809 5.15433 12.0099L2.14333 10.6669C1.94133 10.5769 1.95633 10.2859 2.16633 10.2179L5.43133 9.14992C5.57533 9.10192 5.64133 8.93592 5.56733 8.80392L3.69633 5.43092C3.58133 5.22392 3.80333 4.99292 4.01433 5.09892L7.81333 6.99392C7.95933 7.06692 8.13433 6.97692 8.15933 6.81592L8.87933 2.20392C8.91333 1.98292 9.20433 1.92392 9.32233 2.11492L11.4853 5.62492C11.5793 5.77792 11.8013 5.77792 11.8963 5.62492L14.0593 2.11492C14.1773 1.92392 14.4683 1.98292 14.5023 2.20392L15.2223 6.81592C15.2473 6.97692 15.4223 7.06692 15.5683 6.99392L19.3673 5.09892C19.5783 4.99292 19.8003 5.22392 19.6853 5.43092L17.8143 8.80392C17.7403 8.93592 17.8063 9.10192 17.9503 9.14992L21.2153 10.2179C21.4253 10.2859 21.4403 10.5769 21.2383 10.6669L18.2563 11.9969C18.0903 12.0709 18.0633 12.2939 18.2053 12.4059L20.9373 14.5629C21.0953 14.6879 21.0393 14.9399 20.8443 14.9859L17.8563 15.6979C17.7483 15.7239 17.6723 15.8199 17.6713 15.9309L17.6553 18.1919C17.6543 18.3759 17.4553 18.4909 17.2953 18.3989L16.1483 17.7449"
                    stroke={color}/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M11.6908 21.9998V21.9998C9.16282 21.9998 7.11282 19.9508 7.11282 17.4218V12.1218C7.11282 9.59383 9.16282 7.54483 11.6908 7.54483V7.54483C14.2188 7.54483 16.2688 9.59383 16.2688 12.1218V17.4218C16.2688 19.9508 14.2188 21.9998 11.6908 21.9998Z"
                      stroke={color}/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M11.6914 13.5487C11.6914 14.7467 10.7204 15.7167 9.52343 15.7167C8.32543 15.7167 7.35443 14.7467 7.35443 13.5487C7.35443 12.3507 8.32543 11.3807 9.52343 11.3807C10.7204 11.3807 11.6914 12.3507 11.6914 13.5487Z"
                      stroke={color}/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M10.0231 13.5487C10.0231 13.8247 9.79913 14.0487 9.52313 14.0487C9.24713 14.0487 9.02313 13.8247 9.02313 13.5487C9.02313 13.2727 9.24713 13.0487 9.52313 13.0487C9.79913 13.0487 10.0231 13.2727 10.0231 13.5487Z"
                      fill={color}/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M16.0269 13.5487C16.0269 14.7467 15.0559 15.7167 13.8589 15.7167C12.6609 15.7167 11.6899 14.7467 11.6899 13.5487C11.6899 12.3507 12.6609 11.3807 13.8589 11.3807C15.0559 11.3807 16.0269 12.3507 16.0269 13.5487Z"
                      stroke={color}/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.3586 13.5487C14.3586 13.8247 14.1346 14.0487 13.8586 14.0487C13.5826 14.0487 13.3586 13.8247 13.3586 13.5487C13.3586 13.2727 13.5826 13.0487 13.8586 13.0487C14.1346 13.0487 14.3586 13.2727 14.3586 13.5487Z"
                      fill={color}/>
                <path
                    d="M9.76343 18.9342C10.2804 19.3702 10.9494 19.6432 11.6904 19.6432C12.4314 19.6432 13.1004 19.3702 13.6184 18.9342"
                    stroke={color} strokeLinecap="round"/>
                <path
                    d="M9.76343 9.93332H10.3284C10.5834 9.93332 10.8284 10.0353 11.0094 10.2153V10.2153C11.3854 10.5923 11.9954 10.5923 12.3724 10.2153V10.2153C12.5534 10.0353 12.7984 9.93332 13.0534 9.93332H13.6184"
                    stroke={color} strokeLinecap="round"/>
                <path
                    d="M11.0908 16.7998V17.3998C11.0908 17.7308 11.3598 17.9998 11.6908 17.9998V17.9998C12.0218 17.9998 12.2908 17.7308 12.2908 17.3998V16.7998"
                    stroke={color} strokeLinecap="round"/>
            </svg>

        </View>);
};

export default ActiveIcon;