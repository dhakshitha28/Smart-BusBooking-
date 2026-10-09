package com.smartbus.auth.repository;

import com.smartbus.auth.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * UserRepository provides database CRUD operations for the User document.
 *
 * Annotations:
 * - @Repository: Declares this interface as a Spring Data access bean.
 *
 * Spring Data MongoDB dynamically creates implementation methods matching the naming convention:
 * - findByEmail(String email)
 * - existsByEmail(String email)
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
