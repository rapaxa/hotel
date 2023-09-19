import './Layout.css'
import TodoRooms from "./TodoRooms";

const Layout = () => {
    return (
        <div>
            <section className='btn-filter d-flex justify-content-between'>
                <button className="btn btn-primary">Clear all filters</button>
                <div className='check-room d-flex align-items-center'>
                    <input name="free-room" type="checkbox"/>
                    <label className="px-2">Free room only</label>
                </div>
            </section>
            <section>
                <TodoRooms/>
            </section>
        </div>
    )
}
export default Layout