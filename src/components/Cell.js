import React from 'react'
import styled from 'styled-components'

const StyledCell = styled.div`
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding: 0.4rem 1rem;
    text-align: right;
    background: ${({ row }) => (row % 2 ? null : '#e2e2e2')};

    &:nth-child(4n + 1) {
        text-align: left;
    }
`

const StyledHeader = styled(StyledCell)`
    border-bottom: 2px solid black;
    font-weight: 600;
    background: #c0ff33;
    cursor: pointer;
`

export const HeaderCell = ({ value }) => <StyledHeader>{value}</StyledHeader>

const Cell = ({ row, value }) => <StyledCell row={row}>{value}</StyledCell>

export default Cell
