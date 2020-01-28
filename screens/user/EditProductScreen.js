import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import * as productActions from '../../store/actions/products';

import Colors from '../../constants/Colors';
import {validationForm} from './helper';

const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    title: '',
    imageUrl: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (editedProduct) {
      setInitialValues({
        title: editedProduct.title,
        imageUrl: editedProduct.imageUrl,
        price: editedProduct.price,
        description: editedProduct.description,
      });
    }
  }, []);

  const submitHandler = values => {
    const {title, imageUrl, description, price} = values;
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(prodId, title, imageUrl, description),
      );
    } else {
      dispatch(
        productActions.createProduct(title, imageUrl, description, +price),
      );
    }
    props.navigation.goBack();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      enableReinitialize
      validationSchema={validationForm}>
      {({handleChange, handleSubmit, handleBlur, values, errors, touched}) => (
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                keyboardType="default"
                style={styles.input}
                value={values.title}
                onBlur={handleBlur('title')}
                onChangeText={handleChange('title')}
              />
              {touched.title && errors.title && (
                <Text style={styles.error}>{errors.title}</Text>
              )}
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Image Url</Text>
              <TextInput
                keyboardType="default"
                style={styles.input}
                value={values.imageUrl}
                onBlur={handleBlur('imageUrl')}
                onChangeText={handleChange('imageUrl')}
              />
              {touched.imageUrl && errors.imageUrl && (
                <Text style={styles.error}>{errors.imageUrl}</Text>
              )}
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                value={values.description}
                onBlur={handleBlur('description')}
                onChangeText={handleChange('description')}
              />
              {touched.description && errors.description && (
                <Text style={styles.error}>{errors.description}</Text>
              )}
            </View>
            {!editedProduct && (
              <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  style={styles.input}
                  value={values.price}
                  keyboardType="numeric"
                  onChangeText={handleChange('price')}
                />
                {touched.price && errors.price && (
                  <Text style={styles.error}>{errors.price}</Text>
                )}
              </View>
            )}
            <View style={styles.actions}>
              <Button
                type="submit"
                color={Colors.primary}
                title="Submit"
                onPress={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

EditProductScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  actions: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  error: {
    fontSize: 15,
    color: 'red',
  },
});

export default EditProductScreen;
