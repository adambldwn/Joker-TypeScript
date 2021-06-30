import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface ImageProps {
    theme: DefaultTheme
}

export const Image = styled.img<ImageProps>`
    width: 100px;
    height: 100px;
`;