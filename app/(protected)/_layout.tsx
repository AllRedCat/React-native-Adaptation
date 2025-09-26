import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { router } from 'expo-router';

export default function TabLayout() {
  return (
    <NativeTabs
    >
      <NativeTabs.Trigger name='search' role='search'>
        <Label>Busca</Label>
        <Icon sf={'magnifyingglass'} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='home'>
        <Label>Mapa</Label>
        {/* <Label hidden /> */}
        <Icon sf={{ default: 'map', selected: 'map.fill' }} selectedColor={'#009900'} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='profile'>
        <Label>Perfil</Label>
        <Icon sf={'person.fill'} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
