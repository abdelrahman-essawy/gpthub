import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../src/app/App";

export type Room ={
    name: string;
    subTitle:string,
    id?: string;
    img: string;
    messages:number;
}
export type ChatScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParams, 'Chat'>;
  route: { params: { title: string } };
};