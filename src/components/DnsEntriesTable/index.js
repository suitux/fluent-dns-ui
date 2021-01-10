import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import Paper from '@material-ui/core/Paper'
import MaterialTable from 'material-table'
import { columns } from './table/columns'
import { env } from '../../env'
import * as _ from 'lodash'
import { toast, ToastContainer } from 'react-toastify'

const endpointUrl = `${env.local.dnsApiUrl}/entries`

const DnsEntriesTableComponent = ({ classes }) => {
    const [isLoading, setLoading] = React.useState(true)
    const [entries, setEntries] = React.useState([])

    const fetchData = () => {
        fetch(endpointUrl)
            .then((response) => response.json())
            .then((result) => {
                setEntries(result)
                setLoading(false)
            })
    }

    const showError = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
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
                    maxBodyHeight: '75vh'
                }}
                editable={{
                    onRowAdd: (newData) => {
                        return fetch(endpointUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newData),
                        })
                            .then((res) => res.json())
                            .then((response) => {
                                if(!response.error) {
                                    setEntries([...entries, response.data])
                                } else {
                                    showError(response.message)
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    },
                    onRowUpdate: (newData, oldData) => {
                        return fetch(endpointUrl, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: oldData.id,
                                data: newData,
                            }),
                        })
                            .then((res) => res.json())
                            .then((response) => {
                                const changedIndex = _.findIndex(
                                    entries,
                                    (entry) => entry.id === response.data.id
                                )

                                const newEntries = [...entries]
                                newEntries[changedIndex] = response.data
                                setEntries(newEntries)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    },
                    onRowDelete: (oldData) => {
                        return fetch(endpointUrl, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: oldData.id }),
                        })
                            .then((res) => res.json())
                            .then((response) => {
                                setEntries(
                                    _.remove(
                                        entries,
                                        (entry) =>
                                            entry.id !== response.removedId
                                    )
                                )
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    },
                }}
            />
        </Paper>
    )
}

export const DnsEntriesTable = withStyles(styles)(DnsEntriesTableComponent)
