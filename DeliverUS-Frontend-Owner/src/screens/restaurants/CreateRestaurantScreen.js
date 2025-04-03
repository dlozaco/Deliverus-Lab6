import React, { useEffect, useState } from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { create, getRestaurantCategories } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import restaurantBackground from '../../../assets/restaurantBackground.jpeg'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateRestaurantScreen({ navigation }) {



}
