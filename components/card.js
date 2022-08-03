export const Card = ({ children }) => {
    return (
        <div id="card" className="container">
            <div className="row">
                <div className="col">{children}</div>
            </div>
        </div>
    )
}

export default Card
