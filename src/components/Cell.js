import React from 'react'
import styled, { css } from 'styled-components'

const StyledCell = styled.div`
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding: 0.4rem 1rem;
    text-align: right;

    &:nth-child(4n + 1) {
        text-align: left;
    }
`

const StyledHeader = styled(StyledCell)`
    font-weight: 600;
    cursor: pointer;
`

export const HeaderCell = ({ data }) => <StyledHeader>{data.value}</StyledHeader>

const Cell = ({ data }) => <StyledCell>{data.value}</StyledCell>

export default Cell
