# App Structure & Architecture

We take a 'feature-centric' approach to our app structure. Organized by feature rather than function.

There are 'generic' folders and 'feature' folders. The big key here is that _many_ *generic* folders mape _to one_ *feature* folder. Here's a quick explanation of each general folder and how it relates to a feature folder.

_components_ : These are the components parts that a feature is composed of. E.g. an App feature may have a Header and Footer component.

_shared_: Reusable components that get used across multiple views of an application. 

_state_: State management related code (actions, reducers, constants, selectors) goes here. State used across multiple views gets organized with root App component. If state management is unique to a particular view, it gets organized with that particular view.

_config.*_: Global app config-related code. E.g. config.routes is where the route registration is taken care of. Config folders may exist in views.

_utils.*_: Global utility/helper functions. These may be helpful across multiple components. May exist within views also.

## Atomic Development

[Read this post on atomic design](http://bradfrost.com/blog/post/atomic-web-design/)

In short:

_Atoms_ => _Molecules_ => _Organisms_ => _Templates_ => _Pages_

With atomic development, a button _atom_ + an input _atom_ + a label _atom_ = a search field _molecule_ to pair with a navigations links _molecule_ to make up a header _organism_ sitting at the top of a _page_. 

Thinking about an application in terms of atoms, molecules, and organisms helps promote a more thoughtful, purposeful mindset when developing components, ultimately leading to more reusability. 

We therefore namespace (prefix) our components with it's correct 'type'. We also use two additional 'types': _hoc_ and _object_.

_hoc_ => _h_igher _o_rder _c_omponents => 'a function that takes an existing component and returns another component that wraps it.'

_object_ => objects that deal strictly with structure and layout. They should be style agnostic. The concept is borrowed from the [inuitcss](https://github.com/inuitcss?utf8=%E2%9C%93&query=objects) framework.

Every component directory should contain every file relevant to it. The idea here is that allow the ability to add or remove a single component directly to add or remove it from the application rather than hunting down files.

