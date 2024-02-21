
export const userMessageStyle = (styles?: any) => {
    return {
        backgroundColor: styles.btnColor || 'rgb(0, 123, 255)',
        borderRadius: '5px',
        color: 'white',
        padding: '5px 10px',
        fontSize: '14px',
        marginBottom: '10px',
    }
}

export const assistMessageStyle = {
    backgroundColor: 'rgb(236, 236, 236)',
    color: 'black',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '14px',
    marginBottom: '10px',
}

export const topRowDivStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

export const userMessageTitleStyle = {
    color: 'white',
    fontSize: '18px',
}

export const assistantMessageTitleStyle = {
    color: 'black',
    fontSize: '18px',
    margin: '0',
}

export const docLinkStyle = {
    display: 'inline-block',
    border: '1px solid #A0AEC0',
    marginRight: '10px',
    padding: '2px',
    fontSize: '12px',
    borderRadius: '5px',
    cursor: 'pointer',
}

export const tooltipLinkStyle = {
    display: 'block',
    margin: '5px 0',
    textDecoration: 'underline',
}

export const tooltipStyle = {
    visibility: 'hidden',
    position: 'absolute',
    backgroundColor: '#000',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
    zIndex: '1',
    whiteSpace: 'normal',
    maxWidth: '300px',
    fontSize: '12px',
    overflowY: 'auto',
    maxHeight: '200px',
    marginTop: '15px',
}

export const docContentStyle = {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}