import { render } from '@testing-library/react'
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
        name: 'name1',
        address: '192.168.1.1',
        ttl: 200,
        type: 0x02,
        class: 0x03,
    },
]

test('Render table without elements', () => {

    const fetchDnsEntries = jest.fn()

    const { queryByText } = render(
        <DnsContext.Provider value={{ entries: [], fetchDnsEntries }}>
            <DnsEntriesTable />
        </DnsContext.Provider>
    )

    expect(fetchDnsEntries).toBeCalled();
    expect(queryByText('No records to display')).toBeTruthy()
})
