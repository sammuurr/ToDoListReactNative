import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';


export default interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}