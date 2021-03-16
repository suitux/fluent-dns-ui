import React, { useContext } from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import Paper from '@material-ui/core/Paper'
import MaterialTable from 'material-table'
import { columns } from './table/columns'
import * as _ from 'lodash'
import { showError } from '../../helpers/showError'
import { DnsContext } from '../../context/dns/DnsContext'

const DnsEntriesTableComponent = ({ classes }) => {
    const [isLoading, setLoading] = React.useState(true)
    const {
        entries,
        setEntries,
        fetchDnsEntries,
        addDnsEntry,
        updateDnsEntry,
        deleteDnsEntry,
    } = useContext(DnsContext)

    const fetchData = async () => {
        fetchDnsEntries()
        setLoading(false)
    }

    const onRowAdd = async (newData) => {
        const response = await addDnsEntry(newData)
        if (!response.error) {
            setEntries([...entries, response.data])
        } else {
            showError(response.message)
        }
    }

    const onRowUpdate = async (newData, oldData) => {
        const response = await updateDnsEntry(newData, oldData.id)
        const changedIndex = _.findIndex(
            entries,
            (entry) => entry.id === response.data.id
        )

        const newEntries = [...entries]
        newEntries[changedIndex] = response.data
        setEntries(newEntries)
    }

    const onRowDelete = async (oldData) => {
        const response = await deleteDnsEntry(oldData.id)

        setEntries(
            _.remove(entries, (entry) => entry.id !== response.removedId)
        )
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <Paper className={classes.root}>
            <MaterialTable
                title="DNS Entries"
                columns={columns}
                data={entries}
                isLoading={isLoading}
                options={{
                    actionsColumnIndex: -1,
                    maxBodyHeight: '75vh',
                }}
                editable={{
                    onRowAdd,
                    onRowUpdate,
                    onRowDelete,
                }}
            />
        </Paper>
    )
}

export const DnsEntriesTable = withStyles(styles)(DnsEntriesTableComponent)
