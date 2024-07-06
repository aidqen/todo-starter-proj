export function ProgressBar({ percentage }) {
    const fillerStyles = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: 'rgb(110, 169, 221)',
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out'
    }
     
    return (
        <div className="progress-bar">
            <div style={fillerStyles}></div>
            <h4>{percentage}%</h4>
        </div>
    )
}