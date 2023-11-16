package com.example.project_economic.repository;

import com.example.project_economic.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Long> {
    @Query(value = "select p.category_id, count(p.product_id)  productCount from products p where p.is_actived=true group by p.category_id order by productCount desc",nativeQuery = true)
    List<Object[]> countProductByCategoryId();
    @Query(value = "select * from products as p inner join categories as c on p.category_id=c.category_id where c.category_id=?1 and c.is_actived=true and p.is_actived=true",nativeQuery = true)
    List<ProductEntity>findAllProductByCategoryId(Long category_id);
    @Query(value = "select * from products as p where p.is_actived=true",nativeQuery = true)
    List<ProductEntity>findAllProductIsAvtived();

    @Query(value = "select * from products where name like ?1 limit ?2 offset ?3",nativeQuery = true)
    List<ProductEntity>findAllProductByKeyword(String keyword,Integer pageSize,Integer offsetNumber);

    @Query(value = "select count(product_id) from products where name like ?1",nativeQuery = true)
    Integer countProductByKeyword(String keyword);

    @Query(value = "select * from products where category_id=?1 limit ?2 offset ?3 ",nativeQuery = true)
    List<ProductEntity>findAllProductByCategory(Long id,int pageSize,int offsetNumber);

    @Query(value = "select  count(product_id) from products where category_id=?1",nativeQuery = true)
    Integer countProductByCategory(Long id);

    @Query(value = "select * from products where cost_price between ?1 and ?2 limit ?3 offset ?4",nativeQuery = true)
    List<ProductEntity>findAllProductByPriceAndPagination(int first_price,int second_price,int pageSize,int offsetNumber);

    @Query(value = "select count(product_id) from products where cost_price between ?1 and ?2",nativeQuery = true)
    Integer countProductByPrice(int first_price,int second_price);

    @Query(value = "select * from products where product_id in ?1",nativeQuery = true)
    List<ProductEntity> findByIds(List<Long> ids);
}
