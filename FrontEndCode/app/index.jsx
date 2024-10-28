import {Text, View} from "react-native";
import { Link, useRouter } from "expo-router";
import AppButton from "@/components/navigation/AppButton";

const Index = () =>{
  const router = useRouter();
  const onCreateAccount = ()=>{
    router.navigate("/register")
  }
  return (
  <View style={{
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    gap: 15
  }}>
    <AppButton title={"Create an account"} onPress={onCreateAccount}></AppButton>
    <Text>Already a member?
      <Link href={"/login"}> Sign in</Link>
    </Text>
  </View>
  );
}

export default Index;
