DELIMITER $$

CREATE FUNCTION `like_user_google_function` (`user` VARCHAR(255), `id_build` INT) 
RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  
BEGIN 
    DECLARE existe INT;
    DECLARE ref_cat VARCHAR(255);
    DECLARE id INT;
    DECLARE accion VARCHAR(255);

    SELECT COUNT(*) INTO existe
    FROM likes l
    WHERE user like l.username and l.id_building like id_build;

    IF existe = 0 THEN
        SELECT b.ref_cat INTO ref_cat
        FROM building b  
        WHERE b.id_building = id_build;

        SELECT u.id_user INTO id
        FROM user_google u  
        WHERE u.username = user;

        INSERT INTO likes (id_user, id_building, ref_cat, username, `date`) 
        VALUES (id, id_build, ref_cat, user, NOW());
        SET accion = "add";
    ELSE
        DELETE FROM likes WHERE user like username and id_building like id_build;
        SET accion = "remove";
    END IF; 
    
    RETURN accion;
END$$

DELIMITER ;



DELIMITER $$

CREATE FUNCTION `like_user_github_function` (`user` VARCHAR(255), `id_build` INT) 
RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  
BEGIN 
    DECLARE existe INT;
    DECLARE ref_cat VARCHAR(255);
    DECLARE id INT;
    DECLARE accion VARCHAR(255);

    SELECT COUNT(*) INTO existe
    FROM likes l
    WHERE user like l.username and l.id_building like id_build;

    IF existe = 0 THEN
        SELECT b.ref_cat INTO ref_cat
        FROM building b  
        WHERE b.id_building = id_build;

        SELECT u.id_user INTO id
        FROM user_github u  
        WHERE u.username = user;

        INSERT INTO likes (id_user, id_building, ref_cat, username, `date`) 
        VALUES (id, id_build, ref_cat, user, NOW());
        SET accion = "add";
    ELSE
        DELETE FROM likes WHERE user like username and id_building like id_build;
        SET accion = "remove";
    END IF; 
    
    RETURN accion;
END$$

DELIMITER ;


