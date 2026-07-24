const SummaryCard = ({ title, value, icon, color }) => {

    return (

        <div className="summary-card">

            <div className="summary-header">

                <div
                    className="summary-icon"
                    style={{ background: color }}
                >
                    {icon}
                </div>

                <h3>{title}</h3>

            </div>

            <h1>{value}</h1>

        </div>

    );

};

SummaryCard.defaultProps = {

    icon: "💰",

    color: "#2563eb"

};

export default SummaryCard;