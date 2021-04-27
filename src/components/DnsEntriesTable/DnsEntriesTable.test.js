import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { DnsContext } from '../../context/dns/DnsContext'
import { DnsEntriesTable } from './index'

let entries = [
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
    afterEach(() => {
        jest.clearAllMocks();
    });

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

    test('Given a empty table When we add a row and fill the row and save it Then the row will be part of the table', () => {
        const fetchDnsEntries = jest.fn()
        const addDnsEntry = jest.fn()

        const entry = {
            name: 'web.dev',
            address: '192.168.1.148',
            ttl: 60,
            type: 1,
            class: 1,
        }

        addDnsEntry.mockResolvedValue({
            data: {
                id: 'aaa',
                ...entry,
            }
        })

        const rendered = render(
            <DnsContext.Provider
                value={{ entries: [], fetchDnsEntries, addDnsEntry }}
            >
                <DnsEntriesTable />
            </DnsContext.Provider>
        )

        const { queryByText, queryByLabelText, queryByTitle } = rendered;

        fireEvent.click(queryByText('add_box'))

        queryByLabelText('Name').setAttribute('value', entry.name)
        queryByLabelText('Address').setAttribute('value', entry.value)
        queryByLabelText('TTL').setAttribute('value', entry.ttl)
        queryByLabelText('Type').nextElementSibling.setAttribute(
            'value',
            entry.type
        )
        queryByLabelText('Class').nextElementSibling.setAttribute(
            'value',
            entry.class
        )

        fireEvent.click(queryByTitle('Save'))

        expect(fetchDnsEntries).toBeCalled()
        expect(addDnsEntry).toBeCalled()
    })
})
