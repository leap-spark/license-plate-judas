# License Plate Judas

### Editing "Reasons" Dictionary

The reasons are a nested object located in the `config/index.js` file and aptly named `reasonsDictionary`. Reasons exist for both `happy` and `angry` moods.

A sample schema for a reason is as follows:

```javascript
...
{
    'name': 'Waved Me',
    'id': 'waved_me',
    'color': '',
    'icon': 'pan-tool'
},
...
```

- The `id` can't include a space and should instead be underscore separated words.
- The `icon` is the name of an icon that is included in the `react-native-vector-icons/MaterialIcons` package. A list of the icons can be found [here](https://material.io/tools/icons/).


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
