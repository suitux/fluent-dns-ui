import React, { createContext, useState } from 'react'
import { env } from '../../env'

const endpointUrl = `${env.local.dnsApiUrl}/entries`

export const DnsContext = createContext()

const DnsProvider = ({ children }) => {
    const [entries, setEntries] = useState([])

    const fetchDnsEntries = async () => {
        const responseEntries = await fetch(endpointUrl).then((response) =>
            response.json(),
        )
        setEntries(responseEntries)
    }

    const addDnsEntry = async (entry) => {
        return await fetch(endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        }).then((res) => res.json())
    }

    const updateDnsEntry = async (newData, id) => {
        return fetch(endpointUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                data: newData,
            }),
        }).then((res) => res.json())
    }

    const deleteDnsEntry = (id) => {
        return fetch(endpointUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        }).then((res) => res.json())
    }

    return (
        <DnsContext.Provider
            value={{
                entries,
                setEntries,
                fetchDnsEntries,
                addDnsEntry,
                updateDnsEntry,
                deleteDnsEntry,
            }}
        >
            {children}
        </DnsContext.Provider>
    )
}

export default DnsProvider
