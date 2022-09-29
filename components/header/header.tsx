import { TimeTracker } from "./timetracker"
import { UserMenu } from "./user-menu"

export const AppHeader = () => {
    return (
        <header>
            <div className="wrapper">
                <UserMenu></UserMenu>
                <TimeTracker></TimeTracker>
            </div>
        </header>
    )
}