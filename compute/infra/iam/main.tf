module "policies" {
  source = "./policies"
}

module "instance_profiles" {
  source                = "./instance-profiles"
  ebs_manager_role_name = module.roles.ebs_manager_role_name
}

module "roles" {
  source = "./roles"

  ebs_manager_policy_arn = module.policies.ebs_manager_policy_arn
}

output "main_instance_profile_name" {
  value = module.instance_profiles.main_instance_profile_name
}
