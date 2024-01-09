const TabManager = (props) => {
    const {tabs, onTabChange, tabIndex} = props;
    return (
        <div className="tab-manager-container">
        {
            tabs.map((tab, index) => {
                const activeClass = tabIndex == index ? ' tab-active' : ''
                return (
                    <div
                        className={'tab' + activeClass}
                        onClick={() => onTabChange(index)}>
                        {tab}
                    </div>
                )
            })
        }
        </div>
    )
}

export default TabManager;
