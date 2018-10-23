# License Plate Judas


### Creating A View

The convention to writing a new view is to:
1. Create a new directory in the `views` subdirectory, located in the `app` directory
2. Name the directory after your components name, e.g `LoginView`
3. Create an `index.js` file inside this new directory
4. Wrap your rendered components inside of the `Wrapper` component. The `Wrapper` contains the drawer navigation component.
5. To render the correct title in the top bar navigation, set the title parameter on the navigation prop using the `componentWillMount` lifecycle method.
```javascript
componentWillMount () {
    this.props.navigation.setParams({
        backEnabled: true,
        title: 'Some Title' 
    });
}
```
6. Lastly, ensure you pass the navigator prop onto your child components.
```javascript
render () {
    return (
        <Wrapper>
            <YourComponent navigation={this.props.navigation} />
        </Wrapper>
    );
}
```
