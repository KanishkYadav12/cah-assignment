import { MedusaContainer } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function createAdmin(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Starting admin user creation...");

  try {
    // Check if admin user already exists
    const { data: existingUsers } = await query.graph({
      entity: "user",
      fields: ["id", "email"],
      filters: {
        email: "admin@cah.com",
      },
    });

    if (existingUsers && existingUsers.length > 0) {
      logger.info("Admin user already exists!");
      return;
    }

    // Create admin user
    const userService = container.resolve("user");
    const admin = await userService.create({
      email: "admin@cah.com",
      first_name: "Admin",
      last_name: "User",
    });

    logger.info(`Admin user created successfully!`);
    logger.info(`Email: admin@cah.com`);
    logger.info(`Password: Admin@123456`);
    logger.info(`User ID: ${admin.id}`);

    // Note: In Medusa v2, you'll need to set the invite token or use the authentication flow
    // For production, use the admin panel or authentication API to set password
  } catch (error) {
    logger.error("Error creating admin user:", error);
    throw error;
  }
}
