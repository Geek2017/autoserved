import React, { useState, useMemo, useEffect } from 'react';

function DataTable(props) {
    const {
        cells,
        className,
        classPrefix,
        tableKeys,
        cellRenderer
    } = props

    const BCP = 'datatable'

    return (
        <div className={`${BCP} ${className} ${classPrefix}`}>
            <thead>
                {tableKeys && tableKeys.map((tkeycell, i) => (
                    <th key={i}>
                        {tkeycell.label}
                    </th>
                ))}
            </thead>
            <tbody>
                {cellRenderer && cellRenderer()}
            </tbody>
        </div>
    )
}

export default DataTable