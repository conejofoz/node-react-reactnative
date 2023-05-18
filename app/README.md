# Aplicativo com React Native

npx create react-native app
cd app
npx react-native run-android

se fechar o metro
npx react-native start

o emulador já tem que estar aberto


Rotas
Instalar o react navigation
npm install @react-navigation/native

npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/native-stack


Para versão 6.x do react navigation

react-native-screens package requires one additional configuration step to properly work on Android devices. Edit MainActivity.java file which is located in android/app/src/main/java/<your package name>/MainActivity.java.

Add the highlighted code to the body of MainActivity class:

public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
}






Quem usa mac
npx pod-install ios