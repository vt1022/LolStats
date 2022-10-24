import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.div`
    display: grid;
    grid-template-columns: repeat(4, min-content);
    border-top: 1px solid black;
    border-left: 1px solid black;
    margin: 1rem auto;
    width: min-content;
`

const Table = ({ children }) => <StyledTable>{children}</StyledTable>

export default Table
