package com.ideashopping.ecommerce.dao;

import com.ideashopping.ecommerce.entity.State;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository {
    List<State> findByCountryCode(@Param("code") String code);
}
