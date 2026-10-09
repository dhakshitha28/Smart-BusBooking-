package com.smartbus.auth.config;

import com.smartbus.auth.model.Role;
import com.smartbus.auth.model.User;
import com.smartbus.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * DataInitializer seeds default administrative and driver accounts on first boot if they do not exist.
 *
 * Why this class exists:
 * Since public signup is strictly restricted to ROLE_USER, initial administrative credentials
 * and staff/driver testing accounts must be bootstrapped into MongoDB.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed Administrator if not present
        if (!userRepository.existsByEmail("admin@smartbus.com")) {
            User admin = new User();
            admin.setFullName("SmartBus System Admin");
            admin.setEmail("admin@smartbus.com");
            admin.setPhone("+1000000001");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ROLE_ADMIN.name());
            admin.setAccountStatus("ACTIVE");
            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());

            userRepository.save(admin);
            System.out.println(">>> Initialized default Admin: admin@smartbus.com / Admin@123 (ROLE_ADMIN)");
        }

        // Seed Default Driver for role testing
        if (!userRepository.existsByEmail("driver@smartbus.com")) {
            User driver = new User();
            driver.setFullName("Captain Robert (Driver)");
            driver.setEmail("driver@smartbus.com");
            driver.setPhone("+1000000002");
            driver.setPassword(passwordEncoder.encode("Driver@123"));
            driver.setRole(Role.ROLE_DRIVER.name());
            driver.setAccountStatus("ACTIVE");
            driver.setCreatedAt(LocalDateTime.now());
            driver.setUpdatedAt(LocalDateTime.now());

            userRepository.save(driver);
            System.out.println(">>> Initialized default Driver: driver@smartbus.com / Driver@123 (ROLE_DRIVER)");
        }
    }
}
