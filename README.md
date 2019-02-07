# License Plate Judas

License Plate Judas is an incomplete React-Native app that was an exploration of the framework and it's benefits or drawbacks. The point of the app is to rate drivers on the road by submitting their license plate number, choosing a "mood", and finally the "reason." We understand in practice this app could be hazordous!

The plan was to force a user to verify that they are a passenger in order to use the app, much like Waze does. Since the app never made it that far, there's really no plans to continue to flesh out this functionality.

This app is supplied as-is and is not intended for any sort of production use. Clone it, hack it, steal it, do what you want with it, we don't care. But if you do make something useful from this or happened to have learned from us, we'd love to know about it as we love the ego inflation.

Here is some limited documentation.


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
