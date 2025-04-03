import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import defaultProductImage from '../../../assets/product.jpeg'
import { getProductCategories, create } from '../../api/ProductEndpoints'
import { showMessage } from 'react-native-flash-message'
import DropDownPicker from 'react-native-dropdown-picker'
import * as yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateProductScreen ({ navigation, route }) {
  const [productCategories, setProductCategories] = useState([])
  const [open, setOpen] = useState([])

  useEffect(() => {
    async function fetchProductCategories () {
      try {
        const fetchedRestaurantCategories = await getProductCategories()
        const fetchedRestaurantCategoriesReshaped = fetchedRestaurantCategories.map((e) => {
          return {
            label: e.name,
            value: e.id
          }
        })
        setProductCategories(fetchedRestaurantCategoriesReshaped)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurant categories. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchProductCategories()
  }, [])
  const initialProductValues = { name: null, description: null, price: null, image: null, order: null, productCategory: null, availability: null }
  const pickImage = async (onSuccess) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      if (onSuccess) { onSuccess(result) }
    }
  }
  return (
    <Formik
    initialValues={initialProductValues}
    >
    {({ setFieldValue, values }) => (
        <ScrollView>
            <View style={{ alignItems: 'center' }}>
                <View style={{ width: '60%' }}>
                    <InputItem
                        name='name'
                        label='Name:'
                    />
                    <InputItem
                        name='description'
                        label='Description:'
                    />
                    <InputItem
                        name='price'
                        label='Price:'
                    />
                    <Pressable
                        style={{ marginTop: '20px' }}
                        onPress={() =>
                          pickImage(
                            async result => {
                              await setFieldValue('logo', result)
                            }
                          )
                            }
                        >
                        <TextRegular>Image: </TextRegular>
                        <Image
                          style={styles.image}
                          source={values.image ? { uri: values.image.assets[0].uri } : defaultProductImage}
                        />
                    </Pressable>
                    <InputItem
                        name='order'
                        label='Order:'
                    />
                    <DropDownPicker
                        open={open}
                        value={values.restaurantCategoryId}
                        items={productCategories}
                        setOpen={setOpen}
                        onSelectItem={ item => {
                          setFieldValue('restaurantCategoryId', item.value)
                        }}
                        setItems={setProductCategories}
                        placeholder="Select the restaurant category"
                        containerStyle={{ height: 40, marginTop: 20 }}
                        style={{ backgroundColor: GlobalStyles.brandBackground }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                    />

                    <TextRegular style={styles.switch}>Is it available?</TextRegular>
                    <Switch
                    trackColor={{ false: GlobalStyles.brandSecondary, true: GlobalStyles.brandPrimary }}
                    thumbColor={values.availability ? GlobalStyles.brandSecondary : '#f4f3f4'}
                    value={values.availability}
                    style={styles.switch}
                    onValueChange={value =>
                      setFieldValue('availability', value)
                    }
                    />
                    <Pressable
                              onPress={() => console.log('Button pressed')
                              }
                              style={({ pressed }) => [
                                {
                                  backgroundColor: pressed
                                    ? GlobalStyles.brandPrimaryTap
                                    : GlobalStyles.brandPrimary
                                },
                                styles.button
                              ]}>
                              <TextRegular textStyle={styles.text}>
                                Create product
                              </TextRegular>
                            </Pressable>
                </View>
            </View>
        </ScrollView>
    )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: GlobalStyles.brandSecondary,
    textAlign: 'center'
  },
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  switch: {
    marginTop: 20
  }
})
