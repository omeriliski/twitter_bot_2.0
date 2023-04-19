import { Keys, PopularAccounts } from "../../components";

import "./settings.scss";

const Settings = () => {
    return (
        <div className="d-flex row m-5">
            <Keys/>
            <PopularAccounts/>
        </div>
    );
}

export default Settings;