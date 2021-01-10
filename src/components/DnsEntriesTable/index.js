import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import Paper from '@material-ui/core/Paper'
import MaterialTable from 'material-table'
import { columns } from './table/columns'
import { env } from '../../env'

const endpointUrl = `${env.local.dnsApiUrl}/entries`

const DnsEntriesTableComponent = ({ classes }) => {
    const [isLoading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])

    const fetchData = () => {
        fetch(endpointUrl)
            .then((response) => response.json())
            .then((result) => {
                setData(result)
                setLoading(false)
            })
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <Paper className={classes.root}>
            <MaterialTable
                title="DNS Entries"
                columns={columns}
                data={data}
                isLoading={isLoading}
                options={{
                    actionsColumnIndex: -1,
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
                            .then(res => res.json())
                            .then((response) => {
                                setData([...data, response])
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    },
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve()
                            }, 1000)
                        }),
                }}
            />
        </Paper>
    )
}

export const DnsEntriesTable = withStyles(styles)(DnsEntriesTableComponent)
