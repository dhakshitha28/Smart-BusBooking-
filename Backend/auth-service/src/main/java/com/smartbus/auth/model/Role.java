package com.smartbus.auth.model;

/**
 * Role defines the authorized roles across the SmartBus Travel platform.
 *
 * Why this enum exists:
 * Restricts system roles strictly to these three standard authorities.
 * ROLE_USER: Registered passengers who search, book, and travel.
 * ROLE_DRIVER: Verified bus captains operating vehicle trips.
 * ROLE_ADMIN: Fleet and transit system managers.
 */
public enum Role {
    ROLE_USER,
    ROLE_DRIVER,
    ROLE_ADMIN
}
