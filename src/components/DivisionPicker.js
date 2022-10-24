import React, { useEffect } from 'react'
import styled from 'styled-components'

const StyledDivisionPicker = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto;
`

const DivisionPicker = ({ currTier, setQuery }) => {
    const tiers = ['Challenger', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Iron']
    const divisions = currTier === 'MASTER' || currTier === 'CHALLENGER' ? ['I'] : ['I', 'II', 'III', 'IV']

    const createOptions = (option, i) => (
        <option key={i} value={option.toLowerCase()}>
            {option}
        </option>
    )

    const changeHandler = e => {
        const { name, value } = e.target

        if (value === 'challenger' || value === 'master') {
            setQuery(prevState => ({ ...prevState, [name]: value.toUpperCase(), division: 'I' }))
        } else {
            setQuery(prevState => ({ ...prevState, [name]: value.toUpperCase() }))
        }
    }

    return (
        <StyledDivisionPicker>
            <label htmlFor='tier'>Tier</label>
            <select id='tier' name='tier' onChange={changeHandler}>
                {tiers.map(createOptions)}
            </select>
            <label htmlFor='division'>Division</label>
            <select id='division' name='division' onChange={changeHandler}>
                {divisions.map(createOptions)}
            </select>
        </StyledDivisionPicker>
    )
}

export default DivisionPicker
