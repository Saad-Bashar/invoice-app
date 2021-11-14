import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        invoices: []
    },
    reducers: {
        addInvoice: (state, action) => {
            // add ID to invoice
            action.payload.id = (state.invoices.length + 1).toString()
            // @ts-ignore
            state.invoices.push(action.payload)
        },
        reset: (state) => {
            state.invoices = []
        }
    }
})

export const { addInvoice, reset } = invoiceSlice.actions
export const selectInvoices = (state: RootState) => state.invoice.invoices

export default invoiceSlice.reducer

