import './App.css';
import SignIn from './Signin'

//I do not know how to present different html based on whether you are on the main page or some sub-page.
//Right now it just renders the main page (which only has <Login> at the moment)
//Eventually it will have something like a <Signin /> tag instead which gives options for new account, login, and continue as guest.
//This <Signin /> (or <Login />) floats above the main page, which also needs a .js file
//You can add <MainPage /> somewhere inside of the App div.
function App() {
    //I just put some random lorem ipsum text in there to make sure the sign in works. Remove it if you want.
    return (
    <div className="App">
        <SignIn />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur magna ac arcu condimentum blandit. Nunc a laoreet enim. Duis rhoncus lobortis turpis sit amet iaculis. Curabitur convallis, lectus sed volutpat pellentesque, magna purus eleifend nulla, nec condimentum velit lacus vitae est. Sed augue odio, bibendum at molestie sit amet, congue vel elit. Suspendisse eu lectus nisi. Nulla finibus turpis nec efficitur accumsan. Donec nec fermentum orci. Ut lobortis aliquet metus, facilisis lobortis nisi consectetur a. Aliquam vulputate ante at est commodo cursus. Vestibulum consectetur velit sapien, sed vehicula leo hendrerit vitae. Nullam ut dictum est. Integer semper neque eros, vitae maximus mi consequat eget. Maecenas ut consequat arcu.</p>
        <p>Nulla facilisi. In bibendum lorem eu diam vehicula ullamcorper. Mauris fermentum cursus risus, in eleifend elit finibus vitae. Duis rhoncus nisl sed luctus cursus. Vestibulum gravida ante in volutpat volutpat. Vivamus bibendum molestie metus quis ultrices. Nullam rhoncus congue placerat.</p>
        <p>Nulla nisl odio, condimentum nec posuere at, mollis congue nisl. Aenean porta, velit et pulvinar ultricies, nibh tellus mattis enim, dapibus euismod velit augue id ligula. Donec accumsan ac sapien ac fermentum. Vivamus euismod pharetra sem, sed pellentesque eros accumsan ut. Integer nec libero id massa fringilla sollicitudin vitae quis eros. Praesent vel augue ultrices erat gravida dignissim pulvinar ut enim. Fusce sit amet est at eros venenatis rutrum. Suspendisse porta, tellus ac mattis vestibulum, leo leo malesuada nulla, vitae iaculis ante metus non nibh. Aenean non vulputate magna.</p>
        <p>Donec vestibulum tortor nec viverra rhoncus. Duis et fringilla nibh, nec ultrices urna. Vestibulum tempus lorem vitae neque semper, volutpat condimentum sem condimentum. Donec in consequat magna, maximus fringilla leo. Morbi faucibus ultrices lectus, eget pharetra quam tempor at. Fusce sed molestie erat, commodo consectetur quam. Donec mauris urna, vestibulum vitae lectus nec, fermentum vulputate erat. Duis nunc quam, tristique id mattis vitae, convallis quis dui. Sed molestie eros lacus, et iaculis augue luctus ac. Sed imperdiet lectus in eros condimentum blandit nec et nulla. Etiam condimentum tempus dapibus. Sed pretium eros fringilla massa tincidunt condimentum. Aliquam mauris neque, maximus quis eleifend eu, hendrerit pellentesque sapien. Duis accumsan ex ut tincidunt cursus.</p>
        <p>Sed tincidunt eleifend lobortis. Phasellus ac massa eleifend, aliquet purus non, malesuada ante. Nulla odio mi, lacinia eget sapien eu, interdum placerat ligula. Cras dapibus lectus sit amet iaculis porta. Phasellus sed lobortis augue. Proin cursus imperdiet eros, vitae ullamcorper tellus sollicitudin ac. Nulla vestibulum nisl urna, eu gravida nisl egestas sit amet. Nulla sollicitudin blandit lorem at dapibus. Nam non consectetur sem, eget fermentum arcu. In vitae lorem in neque egestas venenatis. </p>
    </div>
    );
}

export default App;
