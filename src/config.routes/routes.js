// These are the pages you can go to.
//

import { getAsyncInjectors } from 'utils/asyncInjectors';
import globalSagas from 'containers/App/sagas';
import App from 'containers/App';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export function createRoutes(store, auth) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);


 // injectReducer('global', globalReducer);
  injectSagas(globalSagas);

  const routes = [
    {
      path: '/',
      name: 'main',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Main/actions'),
          System.import('containers/Main/reducer'),
          System.import('containers/Main/sagas'),
          System.import('containers/Main'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([actions, reducer, sagas, component]) => {
          injectReducer('main', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
          if (auth.loggedIn()) {
            store.dispatch(actions.checkUser());
           // if(nextState.params.account_id) {
            //  store.dispatch(actions.fetchCurrentAccount(nextState.params.account_id));
           // }
          }
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
          const importModules = Promise.all([
              // System.import('../App/views/Main/views/Dashboard/state/reducer'),
              // System.import('../App/views/Main/views/Dashboard/state/sagas'),
            System.import('containers/Dashboard'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([component]) => {
            //  injectReducer('posts', reducer.default);
            //  injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      childRoutes: [{
        path: '/user/settings',
        name: 'user settings',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('containers/User'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([component]) => {
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
        {
          path: '/forbidden',
          name: 'No Access',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/NoAccess'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: 'account(/:account_id)',
          name: 'Account Dashboard',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/AccountDashboard'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: 'account(/:account_id)/library',
          name: 'Library',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/MediaItemLibrary/reducer'),
              System.import('containers/MediaItemLibrary/sagas'),
              System.import('containers/MediaItemLibrary'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('library', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/account(/:account_id)/calendar',
          name: 'calendar',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              // System.import('../App/views/Main/views/Calendar/state/reducer'),
              // System.import('../App/views/Main/views/Calendar/state/sagas'),
              System.import('containers/Calendar'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
            //  injectReducer('posts', reducer.default);
            //  injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/account(/:account_id)/workflow',
          name: 'workflow',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Workflow'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/account(/:account_id)/feed/:connection_id',
          name: 'Social Feed',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Feed/reducer'),
              System.import('containers/Feed/sagas'),
              System.import('containers/Feed'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('feed', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/account(/:account_id)/statistics',
          name: 'statistics',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Statistics/reducer'),
              System.import('containers/Statistics/sagas'),
              System.import('containers/Statistics'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('connections', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
          childRoutes: [{
            path: '/account(/:account_id)/statistics(/:channel_id)',
            name: 'Channels',
            getComponent(nextstate, cb) {
              const importModules = Promise.all([
                System.import('containers/Statistics/ChannelsInfo/reducer'),
                System.import('containers/Statistics/ChannelsInfo/sagas'),
                System.import('containers/Statistics/ChannelsInfo'),
              ]);

              const renderRoute = loadModule(cb);

              importModules.then(([reducer, sagas, component]) => {
                injectReducer('channel', reducer.default);
                injectSagas(sagas.default);
                renderRoute(component);
              });
            },
            childRoutes: [
              {
                path: '/account(/:account_id)/statistics(/:channel_id)/tweets',
                name: 'tweets',
                getComponent(nextstate, cb) {
                  const importModules = Promise.all([
                    System.import('containers/Statistics/ChannelsInfo/Tweets'),
                  ]);

                  const renderRoute = loadModule(cb);

                  importModules.then(([component]) => {
                    renderRoute(component);
                  });
                },
              },
              {
                path: '/account(/:account_id)/statistics(/:channel_id)/retweets',
                name: 'tweets',
                getComponent(nextstate, cb) {
                  const importModules = Promise.all([
                    System.import('containers/Statistics/ChannelsInfo/ReTweets'),
                  ]);

                  const renderRoute = loadModule(cb);

                  importModules.then(([component]) => {
                    renderRoute(component);
                  });
                },
              },
              {
                path: '/account(/:account_id)/statistics(/:channel_id)/favorites',
                name: 'tweets',
                getComponent(nextstate, cb) {
                  const importModules = Promise.all([
                    System.import('containers/Statistics/ChannelsInfo/Favorites'),
                  ]);

                  const renderRoute = loadModule(cb);

                  importModules.then(([component]) => {
                    renderRoute(component);
                  });
                },
              },
            ],
          },
          ],
        },
        {
          path: '/account(/:account_id)/brands',
          name: 'brands',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Brands'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/account(/:account_id)/list',
          name: 'list',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/List'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/account(/:account_id)/settings',
          name: 'settings',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Settings'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
          indexRoute: { onEnter: (nextState, replace) => replace(`/account/${nextState.params.account_id}/settings/profile`) },
          childRoutes: [{
            path: '/account(/:account_id)/settings/connections',
            name: 'connections',
            getComponent(nextstate, cb) {
              const importModules = Promise.all([
                System.import('containers/Settings/Connections/reducer'),
                System.import('containers/Settings/Connections/sagas'),
                System.import('containers/Settings/Connections'),
              ]);

              const renderRoute = loadModule(cb);

              importModules.then(([reducer, sagas, component]) => {
                injectReducer('connections', reducer.default);
                injectSagas(sagas.default);
                renderRoute(component);
              });
            },
          },
            {
              path: '/account(/:account_id)/settings/profile',
              name: 'Profile',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/Settings/Profile'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            },
            {
              path: '/account(/:account_id)/settings/team',
              name: 'Team',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/Settings/Team'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            },
            {
              path: '/account(/:account_id)/settings/plans',
              name: 'Plans',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/Settings/Plans'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Login'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/signup',
      name: 'signup',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Signup/reducer'),
          System.import('containers/Signup/sagas'),
          System.import('containers/Signup'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signup', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: { onEnter: (nextState, replace) => replace('/signup/account') },
      childRoutes: [
        {
          path: 'account',
          name: 'account',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Signup/Account'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: 'verification',
          name: 'verification',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Signup/Verification'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: 'checkout',
          name: 'checkout',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Signup/Checkout'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    },
    {
      path: 'redeem/token/:token',
      name: 'redeem',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Redeem/reducer'),
          System.import('containers/Redeem/sagas'),
          System.import('containers/Redeem'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('redeem', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
  ];

  return {
    component: App,
   // path: '/',
  //  indexRoute: { onEnter: (nextState, replace) => replace('/account/me') },
    childRoutes: routes,
  };
}
