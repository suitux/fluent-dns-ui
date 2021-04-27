import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { DnsContext } from '../../context/dns/DnsContext'
import { DnsEntriesTable } from './index'

const entries = [
    {
        name: 'name1',
        address: '192.168.1.1',
        ttl: 200,
        type: 0x02,
        class: 0x03,
    },
    {
        name: 'name2',
        address: '192.168.1.1',
        ttl: 200,
        type: 0x02,
        class: 0x03,
    },
]

describe('DnsEntriesTable tests', () => {
    test('Render table without elements', () => {
        const fetchDnsEntries = jest.fn()

        const { queryByText } = render(
            <DnsContext.Provider value={{ entries: [], fetchDnsEntries }}>
                <DnsEntriesTable />
            </DnsContext.Provider>
        )

        expect(fetchDnsEntries).toBeCalled()
        expect(queryByText('No records to display')).toBeTruthy()
    })

    test('Render table with elements', () => {
        const fetchDnsEntries = jest.fn()

        const { queryByText } = render(
            <DnsContext.Provider value={{ entries, fetchDnsEntries }}>
                <DnsEntriesTable />
            </DnsContext.Provider>
        )

        expect(fetchDnsEntries).toBeCalled()
        expect(queryByText('name1')).toBeTruthy()
    })

    test('On add_box click, a new row displays to the user', () => {
        const fetchDnsEntries = jest.fn()

        const { queryByText } = render(
            <DnsContext.Provider value={{ entries: [], fetchDnsEntries }}>
                <DnsEntriesTable />
            </DnsContext.Provider>
        )

        fireEvent.click(queryByText('add_box'))

        expect(queryByText('check')).toBeTruthy()
        expect(fetchDnsEntries).toBeCalled()
    })

})
