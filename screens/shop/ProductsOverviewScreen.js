import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const loading = useSelector(state => state.products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getProducts());
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={data => (
            <ProductItem
              image={data.item.imageUrl}
              title={data.item.title}
              price={data.item.price}
              onSelect={() => {
                selectItemHandler(data.item.id, data.item.title);
              }}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => {
                  selectItemHandler(data.item.id, data.item.title);
                }}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => {
                  dispatch(cartActions.addToCart(data.item));
                }}
              />
            </ProductItem>
          )}
        />
      )}
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => navData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsOverviewScreen;
