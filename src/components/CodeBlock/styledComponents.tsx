import { IconButton } from '@mui/material';
import { CenteredFlex } from 'components/Container';
import styled from 'styled-components';

export const Wrapper = styled(CenteredFlex)`
    position: relative;
    background: ${({ theme }) => theme.palette.accent.dark};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    min-height: 80px;
`;
export const CopyButtonWrapper = styled(IconButton)`
    position: absolute;
    top: 0px;
    right: 0px;
    margin: ${({ theme }) => theme.spacing(1)};
`;

export const CodeWrapper = styled.div`
    padding: 36px 36px 16px 16px;
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;
